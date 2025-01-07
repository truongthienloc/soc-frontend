.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x2 , x0 , 4 
		add     x21 , x0 , x0 
		add     x15 , x0 , x0 
		addi    x10 , x0 , 44 
		addi    x27 , x0 , 2 
InArr:
		addi    x31 , x0 , 52 
		addi    x22 , x0 , 76 
		addi    x7 , x0 , 12 
		addi    x29 , x0 , 56 
		sh      x31 , 4 (x10) 
		sh      x22 , 8 (x10) 
		sh      x7 , 12 (x10) 
		sh      x29 , 16 (x10) 
Loop:
		sll     x26 , x15 , x27 
		add     x14 , x26 , x10 
		lhu     x18 , 4 (x14) 
		add     x21 , x21 , x18 
		addi    x15 , x15 , 1 
		beq     x15 , x2 , Result 
		jal     x0 , Loop 
Result:
		addi    x11 , x0 , 196 
		bne     x11 , x21 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
