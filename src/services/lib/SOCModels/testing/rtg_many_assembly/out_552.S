.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x31 , x0 , 4 
		add     x18 , x0 , x0 
		add     x8 , x0 , x0 
		addi    x27 , x0 , 60 
		addi    x29 , x0 , 2 
InArr:
		addi    x20 , x0 , 8 
		addi    x9 , x0 , 52 
		addi    x16 , x0 , 72 
		addi    x30 , x0 , 56 
		sh      x20 , 68 (x27) 
		sh      x9 , 72 (x27) 
		sh      x16 , 76 (x27) 
		sh      x30 , 80 (x27) 
Loop:
		sll     x11 , x8 , x29 
		add     x13 , x11 , x27 
		lhu     x10 , 68 (x13) 
		add     x18 , x18 , x10 
		addi    x8 , x8 , 1 
		beq     x8 , x31 , Result 
		jal     x0 , Loop 
Result:
		addi    x17 , x0 , 188 
		bne     x17 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
