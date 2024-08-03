.text

#The program checks the ALU instruction in R_type

Main:
		addi    x26 , x0 , 168 
		addi    x16 , x0 , 69 
		addi    x27 , x0 , 100 
		addi    x1 , x0 , 71 
		addi    x9 , x0 , 2 
		blt     x26 , x16 , Less_r 
		bge     x26 , x16 , Bigger_r 
Less_r:
		sub     x22 , x27 , x1 
		and     x3 , x27 , x1 
		slti    x3 , x3 , 181 
		srl     x3 , x3 , x9 
		addi    x20 , x0 , 24 
		bne     x3 , x20 , Fail 
Bigger_r:
		or      x22 , x27 , x1 
		xor     x3 , x27 , x1 
		sltiu   x3 , x3 , 10 
		sra     x3 , x3 , x9 
		addi    x20 , x0 , 34 
		bne     x3 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
