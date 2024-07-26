.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x29 , x0 , 4 
		add     x27 , x0 , x0 
		add     x31 , x0 , x0 
		addi    x1 , x0 , 52 
		addi    x10 , x0 , 2 
InArr:
		addi    x8 , x0 , 12 
		addi    x22 , x0 , 60 
		addi    x11 , x0 , 0 
		addi    x5 , x0 , 8 
		sh      x8 , 56 (x1) 
		sh      x22 , 60 (x1) 
		sh      x11 , 64 (x1) 
		sh      x5 , 68 (x1) 
Loop:
		sll     x17 , x31 , x10 
		add     x16 , x17 , x1 
		lhu     x18 , 56 (x16) 
		add     x27 , x27 , x18 
		addi    x31 , x31 , 1 
		beq     x31 , x29 , Result 
		jal     x0 , Loop 
Result:
		addi    x14 , x0 , 80 
		bne     x14 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
