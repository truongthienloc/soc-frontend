.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x14 , x0 , 4 
		addi    x15 , x0 , 0 
		addi    x2 , x0 , 0 
		addi    x16 , x0 , 52 
InArr:
		addi    x30 , x0 , 56 
		addi    x13 , x0 , 0 
		addi    x29 , x0 , 8 
		addi    x4 , x0 , 64 
		sh      x30 , 76 (x16) 
		sh      x13 , 80 (x16) 
		sh      x29 , 84 (x16) 
		sh      x4 , 88 (x16) 
Loop:
		slli    x11 , x2 , 2 
		add     x28 , x11 , x16 
		lh      x9 , 76 (x28) 
		add     x15 , x15 , x9 
		addi    x2 , x2 , 1 
		beq     x2 , x14 , Result 
		jal     x0 , Loop 
Result:
		addi    x25 , x0 , 128 
		bne     x25 , x15 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
