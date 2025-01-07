.text

#The program checks the ALU instruction in R_type

Main:
		addi    x24 , x0 , 174 
		addi    x2 , x0 , 75 
		addi    x8 , x0 , 71 
		addi    x21 , x0 , 125 
		addi    x14 , x0 , 3 
		blt     x24 , x2 , Less_r 
		bge     x24 , x2 , Bigger_r 
Less_r:
		sub     x10 , x8 , x21 
		and     x6 , x8 , x21 
		slti    x6 , x6 , 133 
		srl     x6 , x6 , x14 
		addi    x31 , x0 , 1 
		bne     x6 , x31 , Fail 
Bigger_r:
		or      x10 , x8 , x21 
		xor     x6 , x8 , x21 
		sltiu   x6 , x6 , 170 
		sra     x6 , x6 , x14 
		addi    x31 , x0 , 23 
		bne     x6 , x31 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
