.text

#The program checks the ALU instruction in I_type

Main:
		addi    x8 , x0 , 181 
		addi    x22 , x0 , 35 
		sltiu   x10 , x8 , 35 
		bltu    x8 , x22 , Less_i 
		bgeu    x8 , x22 , Bigger_i 
Less_i:
		ori     x1 , x8 , 28 
		sub     x17 , x22 , x8 
		srai    x17 , x17 , 2 
		and     x17 , x17 , x0 
		addi    x19 , x0 , 0 
		beq     x17 , x19 , Pass 
Bigger_i:
		ori     x1 , x8 , 193 
		sub     x17 , x22 , x8 
		srai    x17 , x17 , 4 
		and     x17 , x17 , x0 
		addi    x19 , x0 , 0 
		beq     x17 , x19 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
