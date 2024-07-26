.text

#Immediate number create to check action of them 

Main:
		addi    x6 , x0 , 0	#i
		addi    x8 , x0 , 1	#Result
		addi    x7 , x0 , 2	#x
		addi    x4 , x0 , 11	#n
Loop:
		bge     x6 , x4 , Result 
		slli    x8 , x8 , 3 
		addi    x6 , x6 , 1 
		jal     x0 , Loop 
Result:
		addi    x8 , x8 , -1 
		addi    x25 , x0 , 2047 
		bne     x8 , x25 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
