.text

#Immediate number create to check action of them 

Main:
		addi    x24 , x0 , 0	#i
		addi    x2 , x0 , 1	#Result
		addi    x18 , x0 , 2	#x
		addi    x21 , x0 , 11	#n
Loop:
		bge     x24 , x21 , Result 
		slli    x2 , x2 , 3 
		addi    x24 , x24 , 1 
		jal     x0 , Loop 
Result:
		addi    x2 , x2 , -1 
		addi    x14 , x0 , 2047 
		bne     x2 , x14 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
