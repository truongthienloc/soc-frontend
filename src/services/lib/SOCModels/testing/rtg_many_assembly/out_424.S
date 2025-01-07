.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , 44 
		addi    x31 , x0 , 88 
		slt     x19 , x7 , x31 
		bltu    x7 , x31 , Less_i 
		bgeu    x7 , x31 , Bigger_i 
Less_i:
		ori     x30 , x7 , 170 
		sub     x22 , x31 , x7 
		srai    x22 , x22 , 4 
		and     x22 , x22 , x0 
		addi    x26 , x0 , 0 
		beq     x22 , x26 , Pass 
Bigger_i:
		ori     x30 , x7 , 36 
		sub     x22 , x31 , x7 
		srai    x22 , x22 , 2 
		and     x22 , x22 , x0 
		addi    x26 , x0 , 0 
		beq     x22 , x26 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
