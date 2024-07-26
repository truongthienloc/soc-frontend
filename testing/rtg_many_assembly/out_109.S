.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x5 , x0 , 4 
		add     x4 , x0 , x0 
		add     x20 , x0 , x0 
		addi    x21 , x0 , 20 
		addi    x1 , x0 , 2 
InArr:
		addi    x15 , x0 , 76 
		addi    x10 , x0 , 56 
		addi    x8 , x0 , 48 
		addi    x18 , x0 , 4 
		sb      x15 , 76 (x21) 
		sb      x10 , 80 (x21) 
		sb      x8 , 84 (x21) 
		sb      x18 , 88 (x21) 
Loop:
		sll     x23 , x20 , x1 
		add     x26 , x23 , x21 
		lbu     x27 , 76 (x26) 
		add     x4 , x4 , x27 
		addi    x20 , x20 , 1 
		beq     x20 , x5 , Result 
		jal     x0 , Loop 
Result:
		addi    x2 , x0 , 184 
		bne     x2 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
