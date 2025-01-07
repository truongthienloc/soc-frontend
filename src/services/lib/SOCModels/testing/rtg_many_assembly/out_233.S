.text

#The program checks the ALU instruction in I_type

Main:
		addi    x26 , x0 , 136 
		addi    x24 , x0 , 135 
		sltu    x17 , x26 , x24 
		bltu    x26 , x24 , Less_i 
		bgeu    x26 , x24 , Bigger_i 
Less_i:
		ori     x1 , x26 , 133 
		sub     x7 , x24 , x26 
		srai    x7 , x7 , 0 
		and     x7 , x7 , x0 
		addi    x4 , x0 , 0 
		beq     x7 , x4 , Pass 
Bigger_i:
		ori     x1 , x26 , 67 
		sub     x7 , x24 , x26 
		srai    x7 , x7 , 4 
		and     x7 , x7 , x0 
		addi    x4 , x0 , 0 
		beq     x7 , x4 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
