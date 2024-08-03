.text

#Immediate number create to check action of them 

Main:
		addi    x30 , x0 , 0	#i
		addi    x22 , x0 , 1	#Result
		addi    x6 , x0 , 2	#x
		addi    x18 , x0 , 11	#n
Loop:
		bge     x30 , x18 , Result 
		slli    x22 , x22 , 3 
		addi    x30 , x30 , 1 
		jal     x0 , Loop 
Result:
		addi    x22 , x22 , -1 
		addi    x2 , x0 , 2047 
		bne     x22 , x2 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
