.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x10 , x0 , 4 
		add     x23 , x0 , x0 
		add     x12 , x0 , x0 
		addi    x29 , x0 , 4 
		addi    x8 , x0 , 2 
InArr:
		addi    x21 , x0 , 60 
		addi    x27 , x0 , 32 
		addi    x28 , x0 , 52 
		addi    x1 , x0 , 44 
		sb      x21 , 60 (x29) 
		sb      x27 , 64 (x29) 
		sb      x28 , 68 (x29) 
		sb      x1 , 72 (x29) 
Loop:
		sll     x6 , x12 , x8 
		add     x19 , x6 , x29 
		lbu     x9 , 60 (x19) 
		add     x23 , x23 , x9 
		addi    x12 , x12 , 1 
		beq     x12 , x10 , Result 
		jal     x0 , Loop 
Result:
		addi    x11 , x0 , 188 
		bne     x11 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
