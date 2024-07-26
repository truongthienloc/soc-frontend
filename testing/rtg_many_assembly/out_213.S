.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x8 , x0 , 4 
		add     x5 , x0 , x0 
		add     x3 , x0 , x0 
		addi    x29 , x0 , 32 
InArr:
		addi    x9 , x0 , 24 
		addi    x21 , x0 , 4 
		addi    x7 , x0 , 12 
		addi    x25 , x0 , 44 
		sb      x9 , 28 (x29) 
		sb      x21 , 32 (x29) 
		sb      x7 , 36 (x29) 
		sb      x25 , 40 (x29) 
Loop:
		slli    x10 , x3 , 2 
		add     x15 , x10 , x29 
		lb      x22 , 28 (x15) 
		add     x5 , x5 , x22 
		addi    x3 , x3 , 1 
		beq     x3 , x8 , Result 
		jal     x0 , Loop 
Result:
		addi    x12 , x0 , 84 
		bne     x12 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
