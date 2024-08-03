.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x10 , x0 , 4 
		add     x12 , x0 , x0 
		add     x19 , x0 , x0 
		addi    x24 , x0 , 20 
InArr:
		addi    x15 , x0 , 8 
		addi    x6 , x0 , 8 
		addi    x5 , x0 , 0 
		addi    x27 , x0 , 20 
		sb      x15 , 4 (x24) 
		sb      x6 , 8 (x24) 
		sb      x5 , 12 (x24) 
		sb      x27 , 16 (x24) 
Loop:
		slli    x21 , x19 , 2 
		add     x22 , x21 , x24 
		lb      x1 , 4 (x22) 
		add     x12 , x12 , x1 
		addi    x19 , x19 , 1 
		beq     x19 , x10 , Result 
		jal     x0 , Loop 
Result:
		addi    x28 , x0 , 36 
		bne     x28 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
