.text

#Immediate number create to check action of them 

Main:
		addi    x23 , x0 , 0	#i
		addi    x2 , x0 , 1	#Result
		addi    x21 , x0 , 2	#x
		addi    x8 , x0 , 11	#n
Loop:
		bge     x23 , x8 , Result 
		slli    x2 , x2 , 3 
		addi    x23 , x23 , 1 
		jal     x0 , Loop 
Result:
		addi    x2 , x2 , -1 
		addi    x27 , x0 , 2047 
		bne     x2 , x27 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
