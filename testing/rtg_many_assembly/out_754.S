.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x29 , x0 , 4 
		add     x20 , x0 , x0 
		add     x9 , x0 , x0 
		addi    x17 , x0 , 52 
		addi    x10 , x0 , 2 
InArr:
		addi    x25 , x0 , 36 
		addi    x26 , x0 , 0 
		addi    x14 , x0 , 76 
		addi    x24 , x0 , 48 
		sh      x25 , 8 (x17) 
		sh      x26 , 12 (x17) 
		sh      x14 , 16 (x17) 
		sh      x24 , 20 (x17) 
Loop:
		sll     x12 , x9 , x10 
		add     x8 , x12 , x17 
		lhu     x27 , 8 (x8) 
		add     x20 , x20 , x27 
		addi    x9 , x9 , 1 
		beq     x9 , x29 , Result 
		jal     x0 , Loop 
Result:
		addi    x15 , x0 , 160 
		bne     x15 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
