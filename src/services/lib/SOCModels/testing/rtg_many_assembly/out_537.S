.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , 136 
		addi    x16 , x0 , 135 
		sltu    x25 , x7 , x16 
		bltu    x7 , x16 , Less_i 
		bgeu    x7 , x16 , Bigger_i 
Less_i:
		ori     x4 , x7 , 129 
		sub     x27 , x16 , x7 
		srai    x27 , x27 , 0 
		and     x27 , x27 , x0 
		addi    x22 , x0 , 0 
		beq     x27 , x22 , Pass 
Bigger_i:
		ori     x4 , x7 , 80 
		sub     x27 , x16 , x7 
		srai    x27 , x27 , 1 
		and     x27 , x27 , x0 
		addi    x22 , x0 , 0 
		beq     x27 , x22 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
