.text

#Immediate number create to check action of them 

Main:
		addi    x8 , x0 , 0	#i
		addi    x23 , x0 , 1	#Result
		addi    x10 , x0 , 2	#x
		addi    x26 , x0 , 11	#n
Loop:
		bge     x8 , x26 , Result 
		slli    x23 , x23 , 3 
		addi    x8 , x8 , 1 
		jal     x0 , Loop 
Result:
		addi    x23 , x23 , -1 
		addi    x24 , x0 , 2047 
		bne     x23 , x24 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
