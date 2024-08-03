.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x26 , x0 , 4 
		add     x14 , x0 , x0 
		add     x7 , x0 , x0 
		addi    x9 , x0 , 16 
		addi    x21 , x0 , 2 
InArr:
		addi    x28 , x0 , 36 
		addi    x10 , x0 , 72 
		addi    x24 , x0 , 56 
		addi    x18 , x0 , 0 
		sb      x28 , 48 (x9) 
		sb      x10 , 52 (x9) 
		sb      x24 , 56 (x9) 
		sb      x18 , 60 (x9) 
Loop:
		sll     x27 , x7 , x21 
		add     x31 , x27 , x9 
		lbu     x17 , 48 (x31) 
		add     x14 , x14 , x17 
		addi    x7 , x7 , 1 
		beq     x7 , x26 , Result 
		jal     x0 , Loop 
Result:
		addi    x11 , x0 , 164 
		bne     x11 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
