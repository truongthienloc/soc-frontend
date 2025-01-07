.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x30 , x0 , 4 
		add     x15 , x0 , x0 
		add     x21 , x0 , x0 
		addi    x20 , x0 , 4 
		addi    x10 , x0 , 2 
InArr:
		addi    x11 , x0 , 68 
		addi    x27 , x0 , 32 
		addi    x12 , x0 , 24 
		addi    x24 , x0 , 32 
		sh      x11 , 48 (x20) 
		sh      x27 , 52 (x20) 
		sh      x12 , 56 (x20) 
		sh      x24 , 60 (x20) 
Loop:
		sll     x22 , x21 , x10 
		add     x4 , x22 , x20 
		lhu      x8 , 48 (x4) 
		add     x15 , x15 , x8 
		addi    x21 , x21 , 1 
		beq     x21 , x30 , Result 
		jal     x0 , Loop 
Result:
		addi    x17 , x0 , 156 
		bne     x17 , x15 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
