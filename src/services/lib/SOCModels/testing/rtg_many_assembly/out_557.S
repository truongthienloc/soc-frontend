.text

#The program checks the ALU instruction in R_type

Main:
		addi    x2 , x0 , 190 
		addi    x10 , x0 , 91 
		addi    x20 , x0 , 198 
		addi    x7 , x0 , 191 
		addi    x30 , x0 , 3 
		blt     x2 , x10 , Less_r 
		bge     x2 , x10 , Bigger_r 
Less_r:
		sub     x12 , x20 , x7 
		and     x29 , x20 , x7 
		add     x29 , x29 , x12 
		srl     x29 , x29 , x30 
		addi    x22 , x0 , 17 
		bne     x29 , x22 , Fail 
Bigger_r:
		or      x12 , x20 , x7 
		xor     x29 , x20 , x7 
		add     x29 , x29 , x12 
		sra     x29 , x29 , x30 
		addi    x22 , x0 , 47 
		bne     x29 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
