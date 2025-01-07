.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x8 , x0 , 4 
		add     x25 , x0 , x0 
		add     x21 , x0 , x0 
		addi    x31 , x0 , 4 
		addi    x23 , x0 , 2 
InArr:
		addi    x7 , x0 , 56 
		addi    x28 , x0 , 28 
		addi    x20 , x0 , 0 
		addi    x9 , x0 , 68 
		sb      x7 , 36 (x31) 
		sb      x28 , 40 (x31) 
		sb      x20 , 44 (x31) 
		sb      x9 , 48 (x31) 
Loop:
		sll     x29 , x21 , x23 
		add     x19 , x29 , x31 
		lbu     x11 , 36 (x19) 
		add     x25 , x25 , x11 
		addi    x21 , x21 , 1 
		beq     x21 , x8 , Result 
		jal     x0 , Loop 
Result:
		addi    x6 , x0 , 152 
		bne     x6 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
